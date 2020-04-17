package com.google.sps.users;

public class User extends Person{

    public User(String accountUsername, String role, String userKey){
        super(accountUsername, "", Person.Role.USER, userKey);


    }


}