// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import java.util.ArrayList;





/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/upvote-post")
public class UpdatePostUpvoteServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    UserService userService = UserServiceFactory.getUserService();

    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/");
      return;
    }

    String postKeyString = request.getParameter("postKey");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    Entity entityPost = getEntityFromStringKeyOrFail(postKeyString, response, datastore);
    
    String userLoggedInEmail = userService.getCurrentUser().getEmail();

    long newPostupvotes = updatePostUpvoteCountAndListForUser(entityPost,userLoggedInEmail, datastore);

    String json = "{ \"upvotes\" : \"" + newPostupvotes + "\"}";
    response.setContentType("application/json;");
    response.getWriter().println(json);


  }

  private long updatePostUpvoteCountAndListForUser(Entity postEntity, String accountUserEmail, DatastoreService datastore){
      String nicknameOrEmail = ViewThreadServlet.getNicknameFromEmailOrReturnEmail(accountUserEmail);
      ArrayList<String> postUsersUpvotedList = (ArrayList<String>) postEntity.getProperty("usersUpvoted");
      if (postUsersUpvotedList == null){
          postUsersUpvotedList = new ArrayList<String>();
      }
      
      long postUpvotes = (long) postEntity.getProperty("upvotes");

      if (postUsersUpvotedList.contains(nicknameOrEmail)){
          postUpvotes--;
          postUsersUpvotedList.remove(nicknameOrEmail);
      } else {
          postUpvotes++;
          postUsersUpvotedList.add(nicknameOrEmail);
      }

      postEntity.setProperty("upvotes",postUpvotes);
      postEntity.setProperty("usersUpvoted",postUsersUpvotedList);
      datastore.put(postEntity);

      return postUpvotes;

      
      
  }

  private static Entity getEntityFromStringKeyOrFail(String key, HttpServletResponse response, DatastoreService datastore){
    Entity threadEntity = null;
    try{
      Key threadKey = KeyFactory.stringToKey(key);
      System.out.println("thread key: "+threadKey);
      threadEntity = datastore.get(threadKey);
    } catch(IllegalArgumentException | EntityNotFoundException e){
      e.printStackTrace();
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      return null;
    }

    return threadEntity;


  }


}
