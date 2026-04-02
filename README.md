# SkillAdiz Project Documentation

## Project Structure

- **src/**: Contains all the source code for the application  
  - **components/**: Reusable UI components  
  - **pages/**: Application pages  
  - **services/**: API services and helper functions  
- **public/**: Static assets  
- **tests/**: Unit and integration tests  

## Features

- User authentication and authorization  
- Role-Based Access Control (RBAC)  
- Responsive and modular design  
- Dynamic routing  

## RBAC Implementation

The Role-Based Access Control (RBAC) system is implemented using role-permission mapping. The roles are defined as follows:

- **Admin**: Full access to all features
- **User**: Limited access based on assigned permissions
- **Guest**: Read-only access

You can customize roles and permissions in the `config/rbac.js` file, where you can define new roles and attach or detach permissions as needed.

## How to Work with the Codebase

1. **Clone the Repository**:  
   `git clone https://github.com/jithinbinoy2000/skilladiz_nextapp.git`

2. **Install Dependencies**:  
   `npm install`

3. **Run the Development Server**:  
   `npm start`

4. **Run Tests**:  
   `npm test`

Make sure to review the contribution guidelines before making changes to the codebase.

## Conclusion

This documentation provides an overview of SkillAdiz, its structure, features, RBAC implementation, and how to interact with the codebase. For further queries, please refer to the issues section of the repository.