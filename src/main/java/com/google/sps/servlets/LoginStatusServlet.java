package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/loginstatus")
public class LoginStatusServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    response.setContentType("application/json");

    Boolean isLoggedIn = userService.isUserLoggedIn();
    String url = "";
    String accountUsername = "";
    if (isLoggedIn){
      url = userService.createLogoutURL("/");
      String accountEmail = userService.getCurrentUser().getEmail();
      accountUsername = NicknameServlet.getUserNickname(accountEmail);
      if (accountUsername.equals("")){
          accountUsername = accountEmail;
      }

    } else {
      url = userService.createLoginURL("/");
    }

    String isLoggedInJson = "{ \"loginstatus\" : "
      +isLoggedIn+", \"url\" : \""+url+"\" , \"username\" : \""+accountUsername+ "\" }";

    response.getWriter().println(isLoggedInJson);
 
  }
}