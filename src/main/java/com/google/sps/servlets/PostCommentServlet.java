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
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import com.google.sps.data.ForumThread;
import org.ocpsoft.prettytime.*;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.EntityNotFoundException;

import com.google.appengine.api.datastore.KeyFactory;
import java.util.ArrayList;
import java.util.Arrays;







/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/post-comment/*")
public class PostCommentServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    String replyKeyString = request.getPathInfo().substring(1);
    String replyComment = request.getParameter("comment");
    
    UserService userService = UserServiceFactory.getUserService();

    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/");
      return;
    }

    String replyCommentUserEmail = userService.getCurrentUser().getEmail();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity replyEntity = getEntityFromStringKeyOrFail(replyKeyString,response,datastore);
    String threadKeyString = getThreadKeyFromEntity(replyEntity);
    String commentReplyKeyGenerated = putCommentInDatabaseAndReturnKey(replyKeyString, datastore, replyComment, replyCommentUserEmail, threadKeyString);
    updateReplyEntityWithNewComment(replyEntity,commentReplyKeyGenerated,datastore);
    updateMainThreadCounter(threadKeyString, datastore, replyEntity);

    response.sendRedirect("/thread.html?t="+threadKeyString);
  }

  private String getThreadKeyFromEntity(Entity entity){
      if(entity.getKind().equals("Thread")){
          return KeyFactory.keyToString(entity.getKey());
      } else {
          return (String) entity.getProperty("threadKey");
      }

  }

  private void updateMainThreadCounter(String threadKey, DatastoreService datastore, Entity replyEntity){
      if (replyEntity.getKind().equals("Comment")){
           Entity threadEntity = null;
            try{
                threadEntity = datastore.get(KeyFactory.stringToKey(threadKey));
            } catch(Exception e){
                //do nothing
            }

            long threadReplyCount = (long) threadEntity.getProperty("replyCount");
            threadEntity.setProperty("replyCount", threadReplyCount+1);
            datastore.put(threadEntity);
      }
  }



   private static Entity getEntityFromStringKeyOrFail(String key, HttpServletResponse response, DatastoreService datastore){
    Entity replyEntity = null;
    try{
      Key replyKey = KeyFactory.stringToKey(key);
      replyEntity = datastore.get(replyKey);
    } catch(IllegalArgumentException | EntityNotFoundException e){
      e.printStackTrace();
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      return null;
    }

    return replyEntity;
  }

  private void updateReplyEntityWithNewComment(Entity replyEntity, String commentReplyKey, DatastoreService datastore){
      ArrayList<String> replyKeys = (ArrayList<String>) replyEntity.getProperty("replyKeys");
      if (replyKeys == null){
          replyKeys = new ArrayList<String>();
      }
      
      replyKeys.add(commentReplyKey);
      replyEntity.setProperty("replyKeys",replyKeys);

      long replyCount = (long) replyEntity.getProperty("replyCount");
      replyEntity.setProperty("replyCount", replyCount+1);
      datastore.put(replyEntity);


  }

  private String putCommentInDatabaseAndReturnKey(String replyKey, DatastoreService datastore, String comment, String accountEmail, String threadKey){
      Key commentKeyGenerated = datastore.allocateIds("Comment", 1).getStart();
      String keyString = KeyFactory.keyToString(commentKeyGenerated);
      Entity commentEntity = new Entity(commentKeyGenerated);
      commentEntity.setProperty("comment",comment);
      commentEntity.setProperty("replyKey", replyKey);
      commentEntity.setProperty("accountEmail", accountEmail);
      commentEntity.setProperty("upvotes",0);

      ArrayList<String> replyKeys = new ArrayList<String>();
      commentEntity.setProperty("replyKeys", replyKeys);
      commentEntity.setProperty("timeSubmitted",System.currentTimeMillis());
      commentEntity.setProperty("replyCount",0);
      commentEntity.setProperty("threadKey",threadKey);
      commentEntity.setProperty("usersUpvoted", replyKeys);


      datastore.put(commentEntity);

      return keyString;

  }



}
