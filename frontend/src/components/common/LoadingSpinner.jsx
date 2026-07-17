const LoadingSpinner = ({ fullPage = false, size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'spinner-sm', md: '', lg: 'spinner-lg' };

  if (fullPage) {
    return (
      <div className="loading-page">
        <div className={`spinner ${sizes[size]}`} />
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{text}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className={`spinner ${sizes[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
