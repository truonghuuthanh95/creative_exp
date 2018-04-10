import React from 'react';
import { Button, Row, Col, Thumbnail, Grid } from 'react-bootstrap';
export default (props) => {

  const { thumbnail } = props;
  console.log(thumbnail);
  return (
    <Col xs={12} md={6}>
      <Thumbnail src={require('../resourse/image/picnic.jpeg')} alt="242x200">
        <h3 className='text-center'>{thumbnail.name}</h3>
        <p className="text-center">
          <Button bsStyle="primary">Đăng kí</Button>&nbsp;
        </p>
      </Thumbnail>
    </Col>
  );
};
