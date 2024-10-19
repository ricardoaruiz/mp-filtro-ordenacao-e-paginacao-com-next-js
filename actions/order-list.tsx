'use server';

import { Order } from "@/model";
import { APIRequest, APIResponse } from "./types";

type OrderFilter = {
  status?: string;
  search?: string;
}

type OrderSort = 'order_date' | 'amount_in_cents' | 'status' | 'created_at' | 'updated_at'
type OrderListRequest = APIRequest<OrderFilter, OrderSort>
type OrderListResponse = APIResponse<Order[]>

const BASE_URL= 'https://apis.codante.io/api/orders-api'
const ORDER_URL = `${BASE_URL}/orders`

const buildUrl = ({ filter, order = { field: 'order_date', direction: 'desc' }, page = 1 }: OrderListRequest = {}): string => {
  const url = new URL(ORDER_URL);
  const params = new URLSearchParams();

  if (filter) {
    if (filter.status) {
      params.append('status', filter.status);
    }
    if (filter.search) {
      params.append('search', filter.search);
    }
  }

  if (order) {
    const ordenation = order.direction === 'desc' ? '-' : ''
    params.append('sort', `${ordenation}${order.field}`);
  }

  if (page) {
    params.append('page', `${page}`);
  }

  url.search = params.toString();
  return url.toString();
}

export const orderList = async ({ filter, order, page = 1 }: OrderListRequest = {}): Promise<OrderListResponse> => {
  const response = await fetch(buildUrl({ filter, order, page }), {
    cache: 'no-cache',
  });
  const result = await response.json() as OrderListResponse;
  
  return {
    ...result,
    data: result.data.map((order: Order) => ({ 
      ...order, 
      order_date: new Date(order.order_date), 
      created_at: new Date(order.created_at), 
      updated_at: new Date(order.updated_at) 
    }))
  }
}