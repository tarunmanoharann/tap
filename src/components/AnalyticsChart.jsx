import React, { forwardRef, useEffect, useCallback } from 'react';

const AnalyticsChart = forwardRef(({ bills }, ref) => {
  const canvasRef = React.useRef(null);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (bills.length === 0) {
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, height / 2);
      return;
    }

    // Calculate monthly spending trends
    const monthlyData = {};
    bills.forEach(bill => {
      const month = new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!monthlyData[month]) monthlyData[month] = 0;
      monthlyData[month] += bill.amount;
    });

    const months = Object.keys(monthlyData).slice(-6); // Last 6 months
    const amounts = months.map(month => monthlyData[month]);
    const maxAmount = Math.max(...amounts);

    // Draw professional line chart
    const chartArea = {
      left: 60,
      right: width - 40,
      top: 40,
      bottom: height - 60
    };

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chartArea.left, chartArea.top);
    ctx.lineTo(chartArea.left, chartArea.bottom);
    ctx.lineTo(chartArea.right, chartArea.bottom);
    ctx.stroke();

    // Draw line chart
    if (months.length > 1) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      months.forEach((month, index) => {
        const x = chartArea.left + (chartWidth / (months.length - 1)) * index;
        const y = chartArea.bottom - (amounts[index] / maxAmount) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        // Draw data points
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    months.forEach((month, index) => {
      const x = chartArea.left + (chartWidth / (months.length - 1)) * index;
      ctx.fillText(month, x, chartArea.bottom + 20);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = chartArea.top + (chartHeight / 5) * i;
      const value = maxAmount - (maxAmount / 5) * i;
      ctx.fillText(`₹${value.toFixed(0)}`, chartArea.left - 10, y + 4);
    }

    // Chart title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Monthly Spending Trends', width / 2, 25);
  }, [bills]);

  useEffect(() => {
    drawChart();
    
    const handleResize = () => {
      drawChart();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawChart]);

  return (
    <div id="chart-section" ref={ref} className="mt-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Financial Analytics</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width="900"
            height="400"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
});

AnalyticsChart.displayName = 'AnalyticsChart';

export default AnalyticsChart;
