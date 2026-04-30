import { readFileSync } from 'node:fs';

type OpenAIUsageResponse = {
  rate_limit?: {
    primary_window?: {
      used_percent?: number;
      reset_at?: number;
    };
  };
};

type OpenCodeAuth = {
  openai?: {
    access?: string;
  };
};

export type OpenAIUsage = {
  usedPercent: number;
  reset_at: string | null;
  indicator: string;
};

export class OpenAIService {
  async getPrimaryWindowUsage(): Promise<OpenAIUsage> {
    const data = await this.fetchUsage();
    const primaryWindow = data.rate_limit?.primary_window;
    const usedPercent = primaryWindow?.used_percent;

    if (typeof usedPercent !== 'number') {
      throw new Error('rate_limit.primary_window.used_percent was not found in OpenAI response');
    }

    return {
      usedPercent,
      reset_at: primaryWindow?.reset_at ? new Date(primaryWindow.reset_at * 1000).toISOString() : null,
      indicator: getUsageIndicator(usedPercent),
    };
  }

  private async fetchUsage(): Promise<OpenAIUsageResponse> {
    const response = await fetch('https://chatgpt.com/backend-api/wham/usage', {
      headers: this.headers,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`OpenAI usage request failed with status ${response.status}`);
    }

    return (await response.json()) as OpenAIUsageResponse;
  }

  private get headers(): HeadersInit {
    return {
      accept: '*/*',
      'accept-language': 'pt-BR,pt;q=0.9,en;q=0.8',
      authorization: `Bearer ${this.accessToken}`,
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'oai-language': 'pt-BR',
      'x-openai-target-path': '/backend-api/wham/usage',
      'x-openai-target-route': '/backend-api/wham/usage',
    };
  }

  private get accessToken(): string {
    const authPath = process.env.OPENAI_JSON_PATH?.trim();
    if (!authPath) {
      throw new Error('OPENAI_JSON_PATH is not configured');
    }

    try {
      const auth = JSON.parse(readFileSync(authPath, 'utf8')) as OpenCodeAuth;
      const token = auth.openai?.access?.trim();

      if (!token) {
        throw new Error('openai.access was not found');
      }

      return token;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Could not read OpenAI access token from ${authPath}: ${message}`);
    }
  }
}

function getUsageIndicator(percentUsage: number): string {
  if (percentUsage <= 33) return '❄️';
  if (percentUsage <= 66) return '💨';
  return '🔥';
}

export const openAIService = new OpenAIService();
