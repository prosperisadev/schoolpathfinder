import { kv } from '@vercel/kv';
import { KV_KEYS } from './_types';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    // Get current metrics from KV
    const currentMetrics = await kv.get(KV_KEYS.CURRENT_METRICS);
    
    return new Response(JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      kv: {
        currentMetrics,
        metricsKey: KV_KEYS.CURRENT_METRICS
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('[debug-metrics] Error:', error);
    return new Response(JSON.stringify({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
