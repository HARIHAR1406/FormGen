import { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#7C3AED', '#F59E0B', '#06B6D4', '#EF4444', '#10B981', '#F43F5E'];

const AnalyticsCharts = ({ projects = [], stats }) => {
  // Mock Monthly Data for Line Chart
  // In a real app, this would aggregate createdAt or updatedAt from projects
  const monthlyData = useMemo(() => {
    const data = [
      { name: 'Jan', created: 0, views: 0 },
      { name: 'Feb', created: 0, views: 0 },
      { name: 'Mar', created: 0, views: 0 },
      { name: 'Apr', created: 0, views: 0 },
      { name: 'May', created: 0, views: 0 },
      { name: 'Jun', created: 0, views: 0 },
    ];
    
    // Simple mock filling
    projects.forEach(p => {
      // randomly assign to a month for demo purposes, or use real date if recent
      const date = p.createdAt?.toDate ? p.createdAt.toDate() : new Date();
      const monthIndex = date.getMonth();
      if (monthIndex >= 0 && monthIndex < 6) {
        data[monthIndex].created += 1;
        data[monthIndex].views += (p.views || 0);
      }
    });

    // Make sure we have some demo visual data if empty
    if (projects.length === 0) {
      return [
        { name: 'Jan', created: 2, views: 15 },
        { name: 'Feb', created: 3, views: 42 },
        { name: 'Mar', created: 1, views: 25 },
        { name: 'Apr', created: 5, views: 90 },
        { name: 'May', created: 2, views: 110 },
        { name: 'Jun', created: 4, views: 150 },
      ];
    }
    
    return data;
  }, [projects]);

  // Template Usage Pie Chart
  const templateData = useMemo(() => {
    const usage = {};
    projects.forEach(p => {
      const t = p.templateId || 'default';
      usage[t] = (usage[t] || 0) + 1;
    });

    const data = Object.keys(usage).map(k => ({ name: k, value: usage[k] }));
    
    if (data.length === 0) {
      return [
        { name: 'modern-minimal', value: 4 },
        { name: 'classic-floral', value: 2 },
        { name: 'executive-dark', value: 1 }
      ];
    }
    return data;
  }, [projects]);

  return (
    <div className="analytics-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
      
      <div className="chart-card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-secondary)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📈 Monthly Activity
        </h3>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="views" name="Profile Views" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="created" name="Docs Created" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-secondary)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎨 Template Usage
        </h3>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={templateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {templateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsCharts;
