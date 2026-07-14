import { useState } from 'react';

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

interface SubmitOutcome {
  success: boolean;
  message?: string;
}

/**
 * Handles POSTing form data to Web3Forms (https://web3forms.com) and tracks
 * loading/success/error state. Keeps the network/async concern out of form
 * components entirely — they just call `submit(data)` and read `status`.
 */
export function useWeb3FormsSubmit(accessKey: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function submit(data: Record<string, string>): Promise<SubmitOutcome> {
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setStatus('error');
      return { success: false, message: 'missing-key' };
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...data }),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setStatus('success');
        return { success: true };
      }

      setStatus('error');
      const message = result?.message as string | undefined;
      setErrorMessage(message ?? '');
      return { success: false, message };
    } catch {
      setStatus('error');
      return { success: false, message: 'network' };
    }
  }

  return { status, errorMessage, submit, reset: () => setStatus('idle') };
}
