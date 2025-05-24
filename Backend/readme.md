# Uber Backend API Documentation

This document provides information about the Uber Backend API endpoints.

## Base URL

```
http://localhost:PORT/api/v1
```

## Authentication

Most endpoints require authentication using JWT. Include the token in the request header:

```
Authorization: Bearer YOUR_TOKEN
```

## API Endpoints

### User API

#### Register User

- **URL**: `/user/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "status": 201,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john@example.com"
      },
      "token": "jwt_token"
    }
  }
  ```

#### Login User

- **URL**: `/user/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "status": 200,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john@example.com"
      },
      "token": "jwt_token"
    }
  }
  ```

#### Get User Profile

- **URL**: `/user/profile`
- **Method**: `GET`
- **Authentication**: Required
- **Headers**:
  ```
  Authorization: Bearer YOUR_TOKEN
  ```
- **Response**:
  ```json
  {
    "success": true,
    "status": 200,
    "message": "User profile fetched successfully",
    "data": {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john@example.com"
      }
    }
  }
  ```

#### Logout User

- **URL**: `/user/logout`
- **Method**: `GET`
- **Authentication**: Required
- **Headers**:
  ```
  Authorization: Bearer YOUR_TOKEN
  ```
- **Description**: This endpoint invalidates the current user token by adding it to a blacklist. The token will no longer be valid for authentication.
- **Response**:
  ```json
  {
    "success": true,
    "status": 200,
    "message": "User logged out successfully"
  }
  ```

### Captain API

#### Register Captain

- **URL**: `/captains/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain@example.com",
    "password": "yourpassword",
    "phone": "1234567890",
    "location": {
      "lat": 37.7749,
      "lng": -122.4194
    },
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Description**: Registers a new captain in the system. The `vehicleType` must be one of: "car", "motorcycle", or "auto".
- **Response**:
  ```json
  {
    "success": true,
    "status": 201,
    "message": "Captain registered successfully",
    "data": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 37.7749,
        "lng": -122.4194
      },
      "phone": "1234567890"
    }
  }
  ```

## Example Usage

### Get User Profile Example

```javascript
// Using fetch API
const getProfile = async () => {
  try {
    const response = await fetch("http://localhost:PORT/api/v1/user/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_TOKEN",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Using axios
const getProfileWithAxios = async () => {
  try {
    const response = await axios.get(
      "http://localhost:PORT/api/v1/user/profile",
      {
        headers: {
          Authorization: "Bearer YOUR_TOKEN",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching profile:", error.response.data);
  }
};
```

### Logout User Example

```javascript
// Using fetch API
const logoutUser = async () => {
  try {
    const response = await fetch("http://localhost:PORT/api/v1/user/logout", {
      method: "GET",
      headers: {
        Authorization: "Bearer YOUR_TOKEN",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    // Clear token from client storage after successful logout
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Using axios
const logoutUserWithAxios = async () => {
  try {
    const response = await axios.get(
      "http://localhost:PORT/api/v1/user/logout",
      {
        headers: {
          Authorization: "Bearer YOUR_TOKEN",
        },
      }
    );

    console.log(response.data);
    // Clear token from client storage after successful logout
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error during logout:", error.response.data);
  }
};
```

### Captain Registration Example

```javascript
// Using fetch API
const registerCaptain = async () => {
  try {
    const captainData = {
      fullname: {
        firstname: "John",
        lastname: "Doe",
      },
      email: "captain@example.com",
      password: "securepassword",
      phone: "1234567890",
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      vehicle: {
        color: "Black",
        plate: "ABC123",
        capacity: 4,
        vehicleType: "car",
      },
    };

    const response = await fetch(
      "http://localhost:PORT/api/v1/captains/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(captainData),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error registering captain:", error);
  }
};

// Using axios
const registerCaptainWithAxios = async () => {
  try {
    const captainData = {
      fullname: {
        firstname: "John",
        lastname: "Doe",
      },
      email: "captain@example.com",
      password: "securepassword",
      phone: "1234567890",
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      vehicle: {
        color: "Black",
        plate: "ABC123",
        capacity: 4,
        vehicleType: "car",
      },
    };

    const response = await axios.post(
      "http://localhost:PORT/api/v1/captains/register",
      captainData
    );

    console.log(response.data);
  } catch (error) {
    console.error("Error registering captain:", error.response.data);
  }
};
```
