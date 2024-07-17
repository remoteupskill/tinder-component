import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const TinderCard = ({ data, onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({ x: e.clientX - e.target.getBoundingClientRect().left, y: e.clientY - e.target.getBoundingClientRect().top });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    const card = e.target.closest('.card');
    const threshold = card.offsetWidth / 4;
    if (Math.abs(position.x) > threshold) {
      onSwipe(position.x > 0 ? 'right' : 'left');
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <Card
      className={`tinder-card ${isDragging ? 'dragging' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default function Home() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', description: 'Software Engineer', image: '/john.jpg' },
    { id: 2, name: 'Jane Smith', description: 'Designer', image: '/jane.jpg' },
    { id: 3, name: 'Bob Johnson', description: 'Data Scientist', image: '/bob.jpg' },
  ]);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    // Add your logic to handle the swipe here
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          {data.map((item) => (
            <TinderCard key={item.id} data={item} onSwipe={handleSwipe} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
