function StudentCard(props) {
  const cardStyle = {
    width: '250px',
    border: '1px solid #334155',
    borderRadius: '14px',
    padding: '14px',
    background: '#f8fafc',
    boxShadow: '0 8px 20px rgba(0,0,0,0.35)'
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px'
  };

  return (
    <div style={cardStyle}>
      <img src={props.image} alt={props.name} style={imageStyle} />
      <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>{props.name}</h3>
      <p style={{ margin: '4px 0', color: '#334155' }}>Course: {props.course}</p>
      <p style={{ margin: '4px 0', color: '#334155' }}>Year: {props.year}</p>
    </div>
  );
}

export default StudentCard;
