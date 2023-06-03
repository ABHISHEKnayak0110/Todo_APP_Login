import React, { createContext, useContext, useEffect, useState } from 'react'
import jwt from "jsonwebtoken"

interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    todos: Todo[];
 }
  interface Todo {
    id: number;
    title: string;
    completed: boolean;
    subTasks: Todo[];
  }

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    addTodo: (todo: Todo) => void;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth =() => {
    return useContext(AuthContext)
}

const users: User[] = [
    {
      id: 1,
      username: 'Abhishek',
      password: 'Abhi123',
      name: 'Abhishek Nayak',
      todos: [
        { id: 1, title: 'Buy groceries', completed: false, subTasks: [] },
        { id: 2, title: 'Do laundry', completed: true, subTasks: [] },
      ],
    },
  ];
const verifyToken = (token: number | string): User | null => {
    try {
    //   const decodedToken : any = jwt.verify(token, 'secret_key');
      const userId = Number(token);
      const user = users.find((user) => user.id === userId);
      return user || null;
    } catch {
      return null;
    }
  };
  


function AuthContextProvider({children} : any) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const user = verifyToken(token);
          setUser(user);
        }
      }, []);
      const login = (username: string, password: string) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
        //    const tokenjwt = jwt.sign({ userId: user.id }, 'secret_key');
    
        const token = `${user.id}`
          localStorage.setItem('token', token);
          setUser(user);
        }
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('todos');
        setUser(null);
      };

  const addTodo = (todo: Todo) => {
    if (user) {
      user.todos.push(todo);
      setUser({ ...user });
    }
  };

  return (
    <AuthContext.Provider value ={{user , login , logout ,addTodo}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider