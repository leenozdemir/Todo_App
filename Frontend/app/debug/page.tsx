'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      // Test 1: Fetch todos
      const fetchResponse = await fetch('http://localhost:8000/api/todos');
      const fetchData = await fetchResponse.json();
      
      setResult(`✅ FETCH SUCCESS\nStatus: ${fetchResponse.status}\nTodos: ${JSON.stringify(fetchData, null, 2)}`);
      
      // Test 2: Create a todo
      const createResponse = await fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: 'Debug Test Todo',
          description: 'Testing connection',
          status: 'todo',
          priority: 'medium',
        }),
      });
      
      const createData = await createResponse.json();
      
      setResult(prev => prev + `\n\n✅ CREATE SUCCESS\nStatus: ${createResponse.status}\nResponse: ${JSON.stringify(createData, null, 2)}`);
      
    } catch (error) {
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}\n\nFull error: ${JSON.stringify(error, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">API Connection Debug Test</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
        
        {result && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-bold mb-2">Results:</h2>
            <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded">
              {result}
            </pre>
          </div>
        )}
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded">
          <h3 className="font-bold mb-2">Checklist:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Laravel server running on http://localhost:8000</li>
            <li>Next.js running on http://localhost:3000</li>
            <li>CORS configured in Laravel</li>
            <li>Check browser console (F12) for errors</li>
            <li>Check Network tab for request details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}