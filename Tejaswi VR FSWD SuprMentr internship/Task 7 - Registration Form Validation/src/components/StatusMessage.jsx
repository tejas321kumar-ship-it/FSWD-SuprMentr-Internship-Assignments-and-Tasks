function StatusMessage(props) {
  if (props.type === 'error') {
    return <p className="error">{props.text}</p>;
  }

  if (props.type === 'success') {
    return <p className="success">{props.text}</p>;
  }

  return null;
}

export default StatusMessage;
