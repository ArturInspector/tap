# © 2025 Visa.
import streamlit as st
import sqlite3
import pandas as pd
from datetime import datetime, timedelta
import re

DB_PATH = "merchant.db"

def get_connection():
    return sqlite3.connect(DB_PATH)

def extract_agent_id(email):
    """(agent_123@system.local -> 123)"""
    match = re.search(r'agent_(\w+)@', email)
    return match.group(1) if match else None

def get_agent_stats():
    """SQLite, TODO: interface, expanded agents table"""
    conn = get_connection()
    query = """
        SELECT 
            customer_email,
            customer_name,
            total_amount,
            created_at,
            status
        FROM orders
        WHERE customer_email LIKE 'agent_%@system.local'
        ORDER BY created_at DESC
    """
    df = pd.read_sql_query(query, conn)
    conn.close()
    
    if df.empty:
        return pd.DataFrame()
    
    df['agent_id'] = df['customer_email'].apply(extract_agent_id)
    df['created_at'] = pd.to_datetime(df['created_at'])
    
    return df

def get_agent_summary(df):
    """sort.values by total_revenue"""
    if df.empty:
        return pd.DataFrame()
    
    summary = df.groupby('agent_id').agg({
        'total_amount': ['sum', 'count', 'mean'],
        'status': lambda x: (x == 'confirmed').sum()
    }).reset_index()
    
    summary.columns = ['agent_id', 'total_revenue', 'total_orders', 'avg_order', 'confirmed_orders']
    summary['conversion_rate'] = (summary['confirmed_orders'] / summary['total_orders'] * 100).round(1)
    summary = summary.sort_values('total_revenue', ascending=False)
    
    return summary

def get_suspicious_agents(df, threshold_requests=10, threshold_conversion=0.1):
    """first model - many requests, low conversion rate (TODO: Algorithm or ML)"""
    if df.empty:
        return pd.DataFrame()
    
    summary = get_agent_summary(df)
    suspicious = summary[
        (summary['total_orders'] >= threshold_requests) & 
        (summary['conversion_rate'] < threshold_conversion * 100)
    ]
    return suspicious

def get_top_products_by_agents():
    conn = get_connection()
    query = """
        SELECT 
            p.name,
            p.price,
            SUM(oi.quantity) as total_quantity,
            SUM(oi.price * oi.quantity) as total_revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN products p ON oi.product_id = p.id
        WHERE o.customer_email LIKE 'agent_%@system.local'
        GROUP BY p.id, p.name, p.price
        ORDER BY total_revenue DESC
        LIMIT 10
    """
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df

st.set_page_config(page_title="Agent Dashboard", layout="wide")
st.title("🤖 Дашборд агентов для мерчанта")

df = get_agent_stats()

if df.empty:
    st.warning("Нет данных об агентах. Создайте несколько заказов через агентов.")
else:
    # Общая статистика
    col1, col2, col3, col4 = st.columns(4)
    total_agents = df['agent_id'].nunique()
    total_revenue = df['total_amount'].sum()
    total_orders = len(df)
    avg_order = total_revenue / total_orders if total_orders > 0 else 0
    
    col1.metric("Агентов", total_agents)
    col2.metric("Выручка", f"${total_revenue:,.2f}")
    col3.metric("Заказов", total_orders)
    col4.metric("Средний чек", f"${avg_order:.2f}")
    
    st.divider()
    
    # Статистика по агентам
    st.subheader("Agents summary")
    summary = get_agent_summary(df)
    st.dataframe(summary, use_container_width=True)
    

    st.subheader("📈 Sales dynamics")
    df_daily = df.groupby(df['created_at'].dt.date).agg({
        'total_amount': 'sum',
        'agent_id': 'count'
    }).reset_index()
    df_daily.columns = ['date', 'revenue', 'orders']
    st.line_chart(df_daily.set_index('date'))
    
    st.subheader("🛍️ Top products by agents")
    top_products = get_top_products_by_agents()
    if not top_products.empty:
        st.dataframe(top_products, use_container_width=True)
    else:
        st.info("Нет данных о товарах")
    

    st.subheader("⚠️ Guard: suspicious agents")
    suspicious = get_suspicious_agents(df)
    if not suspicious.empty:
        st.warning(f"Найдено {len(suspicious)} подозрительных агентов:")
        st.dataframe(suspicious[['agent_id', 'total_orders', 'conversion_rate', 'total_revenue']], use_container_width=True)
        st.caption("⚠️ Many requests, but low conversion rate - possibly bots or fraudsters")
    else:
        st.success("✅ No suspicious agents found")



