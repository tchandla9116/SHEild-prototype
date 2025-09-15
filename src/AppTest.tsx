import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function AppTest() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4">
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
          <Shield className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          SHEild Test
        </h1>
        <p className="text-lg text-gray-600">
          Testing Basic Functionality
        </p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Component Test</h2>
        <p className="text-gray-600 mb-4">
          Click count: {count}
        </p>
        <Button 
          onClick={() => setCount(count + 1)}
          className="w-full"
        >
          Test Button
        </Button>
      </Card>

      <div className="text-center text-sm text-gray-500">
        If you see this, the basic components are working correctly.
      </div>
    </div>
  );
}