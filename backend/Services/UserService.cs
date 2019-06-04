using System.Collections.Generic;
using System.Linq;
using Users.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using MongoDB.Bson;
using System;

namespace Users.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IConfiguration config)
        {   
            var client = new MongoClient(config.GetConnectionString("appUsers"));
            var database = client.GetDatabase("appUsers");
            _users = database.GetCollection<User>("Users");
        }

        public List<User> Get()
        {
            return _users.Find(user => true).ToList();
        }

        public User GetByID(string id)
        {
            return _users.Find<User>(user => user._id == id).FirstOrDefault();
        }

        public User GetByEmail(string email)
        {
            return _users.Find<User>(user => user.Email == email).FirstOrDefault();
        }

        public User Create(User user)
        {
            _users.InsertOne(user);

            return user;
        }

        public void Update(string id, User userIn)
        {
            _users.ReplaceOne(user => user._id == id, userIn);
        }

        public void Remove(User userIn)
        {
            _users.DeleteOne(user => user.ID == userIn.ID);
        }

        public void Remove(string id)
        {
            _users.DeleteOne(user => user._id == id);
        }
    }
}