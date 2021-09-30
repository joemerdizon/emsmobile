import axios from "axios"
import { BaseUrl } from "../constants/paths"
import AsyncStorage from '@react-native-async-storage/async-storage';


export function getToken(userName, password){

  const userDetails = JSON.stringify({
      'userName': userName,
      'password': password,
      'returnUrl': 'string',
      'rememberMe': true
  });

  var config = {
      method: 'post',
      url: BaseUrl + '/api/Authentication/Login',
      headers: { 
        'accept': 'text/plain', 
        'Content-Type': 'application/json'
      },
      data : userDetails
    };

  return new Promise((resolve,reject) => {
      axios(config).then(response => {
          resolve(JSON.stringify(response.data));
        })
        .catch(err => reject(err)) 
  })
}

export async function getAllBaragays() {

  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var config = {
    method: 'get',
    url: BaseUrl + '/api/Barangay',
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization
    }
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.data));
    })
    .catch(err => reject(err)) 
  })
}

export async function getAllClusters(brgyId) {

  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var config = {
    method: 'get',
    url: BaseUrl + '/api/Cluster/GetClustersByBaragayId/' + brgyId,
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization
    }
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.data));
    })
    .catch(err => reject(err)) 
  })
}

export async function getAllPrecincts(clusterId) {

  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var config = {
    method: 'get',
    url: BaseUrl + '/api/Precinct/GetPrecinctsByClusterId/' + clusterId,
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization
    }
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.data));
    })
    .catch(err => reject(err)) 
  })
}

export async function saveMember(model) {

  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var data = JSON.stringify(model);
  console.log(data);
  
  var config = {
    method: 'post',
    url:  BaseUrl + '/api/Person/Add',
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.status));
    })
    .catch(err => reject(err)) 
  })
  
}

export async function getClusters() {
  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var config = {
    method: 'get',
    url: BaseUrl + '/api/Cluster/GetClusters',
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization
    }
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.data));
    })
    .catch(err => reject(err)) 
  })
}

export async function getPrecincts() {
  const userDetails = await AsyncStorage.getItem('userDetails');
  const userToken = JSON.parse(userDetails)["userToken"];
  const authorization = 'Bearer ' + userToken;

  var config = {
    method: 'get',
    url: BaseUrl + '/api/Precinct/GetPrecincts',
    headers: { 
      'accept': 'text/plain', 
      'Authorization': authorization
    }
  };
  
  return new Promise((resolve, reject) => {
    axios(config).then(response => {
      resolve(JSON.stringify(response.data));
    })
    .catch(err => reject(err)) 
  })
}