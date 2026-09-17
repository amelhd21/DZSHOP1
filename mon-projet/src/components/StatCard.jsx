function StatCard({
  title,
  value,
  icon,
  subtitle,
  className = ""
}) {
  return (
    <div className={`stat-card ${className}`}>

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">

        <span className="stat-title">
          {title}
        </span>

        <h2>
          {value}
        </h2>

        {subtitle && (
          <small>
            {subtitle}
          </small>
        )}

      </div>

    </div>
  );
}

export default StatCard;
