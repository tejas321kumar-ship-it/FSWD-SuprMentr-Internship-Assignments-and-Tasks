import StudentCard from './components/StudentCard';

function App() {
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0f172a, #1e293b)',
    fontFamily: 'Verdana, sans-serif',
    padding: '24px'
  };

  const wrapStyle = {
    maxWidth: '900px',
    margin: '0 auto'
  };

  const rowStyle = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  };

  return (
    <div style={pageStyle}>
      <div style={wrapStyle}>
        <h1 style={{ marginTop: 0, color: '#fef3c7' }}>Student ID Card Component</h1>
        <div style={rowStyle}>
          <StudentCard
            name="Amit Sharma"
            course="AI"
            year="2nd Year"
            image="https://i.pravatar.cc/150?img=12"
          />
          <StudentCard
            name="Riya Patel"
            course="Web Development"
            year="3rd Year"
            image="https://i.pravatar.cc/150?img=32"
          />
          <StudentCard
            name="Kiran Rao"
            course="Data Science"
            year="1st Year"
            image="https://i.pravatar.cc/150?img=24"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
