package com.google.sps.users;

public abstract class Person{

    enum Role {
        ADMIN, MODERATOR, USER;
    }

    private String accountUsername;
    private String nickname;
    private Role role;  //make this an ENUM

    public Person(String accountUsername, String nickname, Role role){
        this.accountUsername = accountUsername;
        this.nickname = nickname;
        this.role = role;
    }

    public Role getUserRole(){
        return role;
    }

    public void setUserRole(Role role){
        this.role = role;
    }

    public void setUserNickname(String nickname){
        this.nickname = nickname;
    }

    public String getUserNickname(){
        return nickname;
    }


}
