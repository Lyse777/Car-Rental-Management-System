import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form, InputGroup, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const industryMapping = {
  "All": "All",
  "Toyota Motor Corporation": "Toyota_Motor_Corporation",
  "BMW": "BMW",
  "Hyundai Motor Group": "Hyundai_Motor_Group",
  "Ford Motor Company": "Ford_Motor_Company",
  "Volkswagen Group": "Volkswagen_Group",
  "Mercedes Benz": "Mercedes_Benz"
};

const colorOptions = ["All", "Red", "Blue", "Black", "Silver", "White"];

const statusColors = {
  Available: 'green',
  Borrowed: 'orange',
  Maintenance: 'blue',
  Reserved: 'grey'
};

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('modelAsc');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/cars/all')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => {
          let result = 0;
          switch (sortKey) {
            case 'priceDesc': result = parseInt(b.rental_price_per_day) - parseInt(a.rental_price_per_day); break;
            case 'priceAsc': result = parseInt(a.rental_price_per_day) - parseInt(b.rental_price_per_day); break;
            case 'modelDesc': result = b.model.localeCompare(a.model); break;
            case 'modelAsc': result = a.model.localeCompare(b.model); break;
            case 'yearDesc': result = parseInt(b.years) - parseInt(a.years); break;
            case 'yearAsc': result = parseInt(a.years) - parseInt(b.years); break;
            case 'mileageDesc': result = parseInt(b.mileage) - parseInt(a.mileage); break;
            case 'mileageAsc': result = parseInt(a.mileage) - parseInt(b.mileage); break;
            default: break;
          }
          return result;
        });
        setCars(data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, [sortKey]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedIndustry === 'All' || car.make.trim() === industryMapping[selectedIndustry]) &&
    (selectedColor === 'All' || car.color === selectedColor)
  );

  const handleRentNow = carId => navigate(`/CarDetails/${carId}`);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <Container style={{ marginTop: '80px', backgroundColor: '#f8f9fa', border: '0.5px solid lavender', borderRadius: '5px' }}>
      <br /> <br/><br/>
      <Row>
        <Col md={3}>
          <Form>
            <Form.Group>
              <Form.Label><b>Search</b></Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search car..."
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label><b>Sort By</b></Form.Label>
              {['modelAsc', 'modelDesc', 'priceAsc', 'priceDesc', 'yearAsc', 'yearDesc', 'mileageAsc', 'mileageDesc'].map(option => (
                <Form.Check
                  key={option}
                  type="radio"
                  label={getOptionLabel(option)}
                  name="sortOptions"
                  value={option}
                  checked={sortKey === option}
                  onChange={handleSortChange}
                />
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label><b>Industry</b></Form.Label>
              {Object.keys(industryMapping).map(key => (
                <Form.Check
                  key={key}
                  type="radio"
                  label={key}
                  name="industryGroup"
                  value={key}
                  checked={selectedIndustry === key}
                  onChange={handleIndustryChange}
                />
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label><b>Color</b></Form.Label>
              {colorOptions.map(color => (
                <Form.Check
                  key={color}
                  type="radio"
                  label={color}
                  name="colorGroup"
                  value={color}
                  checked={selectedColor === color}
                  onChange={handleColorChange}
                />
              ))}
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <Row>
            {currentItems.length > 0 ? currentItems.map(car => (
              <Col md={4} key={car.car_ID} style={{ marginBottom: '20px' }}>
                <Card style={{ width: '100%', height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <Card.Img variant="top"
                    src={car.image ? `${car.image}` : "https://via.placeholder.com/150"}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                    style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{car.model}</Card.Title>
                    <Card.Text>
                      {car.make} <br />
                      Year: {car.years} <br />
                      Color: {car.color} <br />
                      Mileage: {car.mileage} miles <br />
                      Price per day: RWF {car.rental_price_per_day} <br />
                      Status: <span style={{ color: statusColors[car.car_status] }}>{car.car_status}</span> <br />
                    </Card.Text>
                    {car.car_status !== 'Borrowed' && (
                      <Button variant="dark" onClick={() => handleRentNow(car.car_ID)}>
                        Rent Now
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col> 
            )) : <Col className="text-center p-5">
              <h4>No cars found matching your criteria.</h4>
            </Col>
            }
          </Row>
        
          {totalPages > 1 && (
            <Pagination className="justify-content-center" style={{ marginTop: '20px' }}>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Col>
      </Row>
      <br/> 
    </Container>
  );
  
};

const getOptionLabel = (option) => {
  switch (option) {
    case 'modelAsc': return 'Model: A-Z';
    case 'modelDesc': return 'Model: Z-A';
    case 'priceAsc': return 'Price: Lowest to Highest';
    case 'priceDesc': return 'Price: Highest to Lowest';
    case 'yearAsc': return 'Year: Oldest to Newest';
    case 'yearDesc': return 'Year: Newest to Oldest';
    case 'mileageAsc': return 'Mileage: Lowest to Highest';
    case 'mileageDesc': return 'Mileage: Highest to Lowest';
    default: return '';
  }
};

export default Cars;
