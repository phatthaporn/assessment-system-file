import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({point}) {
  const data = {
    labels: ['ชาย', 'หญิง', 'เพศทางเลือก'],
    datasets: [
        {
          label: '# of Votes',
          data: point,
          backgroundColor: [
            '#3E4C76',
            'rgba(255, 50, 50, 0.8)',
            "rgba(255, 99, 50, 0.7)",
          ],
          borderColor: [
            
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            "rgba(255, 99, 50, 1)",
          ],
          borderWidth: 1,
        },
      ],
  }
  return <Pie data={data} options={{maintainAspectRatio: false }}/>;
}
