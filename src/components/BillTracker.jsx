import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header';
import StatsDashboard from './StatsDashboard';
import BillForm from './BillForm';
import BillList from './BillList';
import AnalyticsChart from './AnalyticsChart';

const BillTracker = () => {
  const [bills, setBills] = useState([]);
  const [networkInfo, setNetworkInfo] = useState({
    isOnline: navigator.onLine,
    effectiveType: '4g',
    downlink: 10
  });
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    city: 'Unknown',
    country: 'Unknown'
  });
  const [isProcessing, setIsProcessing] = useState(false);
 
  const [showInsights, setShowInsights] = useState(false);
  const [billHistory, setBillHistory] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const backgroundTaskRef = useRef(null);
  const observerRef = useRef(null);
  const statsRef = useRef(null);
  const chartRef = useRef(null);
  const billsListRef = useRef(null);
  const insightsRef = useRef(null);

  // Background Tasks API Integration
  const scheduleBackgroundTask = useCallback((callback) => {
    if ('requestIdleCallback' in window) {
      backgroundTaskRef.current = requestIdleCallback(callback, {
        timeout: 2000
      });
    } else {
      setTimeout(callback, 100);
    }
  }, []);

  const cancelBackgroundTask = useCallback(() => {
    if (backgroundTaskRef.current && 'cancelIdleCallback' in window) {
      cancelIdleCallback(backgroundTaskRef.current);
    }
  }, []);

  // Network Information API Integration
  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      setNetworkInfo({
        isOnline: navigator.onLine,
        effectiveType: connection?.effectiveType || '4g',
        downlink: connection?.downlink || 10
      });
    };

    updateNetworkInfo();
    window.addEventListener('online', updateNetworkInfo);
    window.addEventListener('offline', updateNetworkInfo);

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      window.removeEventListener('online', updateNetworkInfo);
      window.removeEventListener('offline', updateNetworkInfo);
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  // Geolocation API Integration
  useEffect(() => {
    if ('geolocation' in navigator) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const mockCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
            const mockCity = mockCities[Math.floor(Math.random() * mockCities.length)];
            
            setLocationData({
              latitude,
              longitude,
              city: mockCity,
              country: 'India'
            });
          } catch (error) {
            console.error('Geocoding error:', error);
            setLocationData(prev => ({ ...prev, latitude, longitude }));
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        options
      );
    }
  }, []);

  // Calculate insights with background tasks
  const calculateInsights = useCallback(() => {
    scheduleBackgroundTask(() => {
      
     
      
      const history = bills.map((bill, index) => ({
        ...bill,
        id: `history-${index}`,
        paymentDate: bill.paid ? new Date(bill.dueDate).toISOString() : null
      }));
      setBillHistory(history);
    });
  }, [bills, scheduleBackgroundTask]);

  // Network-aware processing
  const processWithNetworkAwareness = useCallback(async (task) => {
    setIsProcessing(true);
    
    let delay = 200;
    if (networkInfo.effectiveType === '3g') delay = 500;
    if (networkInfo.effectiveType === '2g') delay = 1000;
    if (!networkInfo.isOnline) delay = 100;

    return new Promise((resolve) => {
      scheduleBackgroundTask(() => {
        setTimeout(() => {
          task();
          setIsProcessing(false);
          resolve();
        }, delay);
      });
    });
  }, [networkInfo, scheduleBackgroundTask]);

  const handleAddBill = async (newBill) => {
    await processWithNetworkAwareness(() => {
      setBills(prev => [...prev, newBill]);
    });
  };

  const markAsPaid = async (id) => {
    await processWithNetworkAwareness(() => {
      setBills(prev => prev.map(bill => 
        bill.id === id ? { ...bill, paid: true, paidDate: new Date().toISOString() } : bill
      ));
    });
  };

  const deleteBill = async (id) => {
    await processWithNetworkAwareness(() => {
      setBills(prev => prev.filter(bill => bill.id !== id));
    });
  };

  const stats = {
    total: bills.length,
    paid: bills.filter(b => b.paid).length,
    overdue: bills.filter(b => {
      const dueDate = new Date(b.dueDate);
      const today = new Date();
      return dueDate < today && !b.paid;
    }).length,
    totalAmount: bills.reduce((sum, bill) => sum + bill.amount, 0),
    avgAmount: bills.length > 0 ? bills.reduce((sum, bill) => sum + bill.amount, 0) / bills.length : 0
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Header 
        locationData={locationData} 
        networkInfo={networkInfo} 
        isProcessing={isProcessing} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsDashboard 
          ref={statsRef}
          stats={stats} 
          
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <BillForm 
            locationData={locationData}
            onAddBill={handleAddBill}
            isProcessing={isProcessing}
          />
          
          <BillList 
            ref={billsListRef}
            bills={bills}
            onMarkAsPaid={markAsPaid}
            onDeleteBill={deleteBill}
            isProcessing={isProcessing}
            showInsights={showInsights}
            onToggleInsights={() => setShowInsights(!showInsights)}
            loadingMore={loadingMore}
            onLoadMore={() => {}}
          />
        </div>

        <AnalyticsChart 
          ref={chartRef}
          bills={bills}
        />
      </div>
    </div>
  );
};

export default BillTracker;
