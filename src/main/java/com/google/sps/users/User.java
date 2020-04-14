package com.google.sps.users;

public class User extends Person{

    public User(String accountUsername){
        super(accountUsername, "", Person.Role.USER);

    }

}