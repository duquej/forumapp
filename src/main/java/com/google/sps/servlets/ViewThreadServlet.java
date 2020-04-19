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


import com.google.gson.Gson;
import com.google.sps.data.Comment;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import com.google.sps.data.ForumThread;
import com.google.sps.data.Comment;
import org.ocpsoft.prettytime.*;


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/view-thread/*")
public class ViewThreadServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
    //validate thread URL here.
    String threadKeyString = request.getPathInfo().substring(1);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity threadEntity = getEntityFromStringKeyOrFail(threadKeyString, response, datastore);

    String threadTitle = (String) threadEntity.getProperty("title");
    String threadBody = (String) threadEntity.getProperty("body");
    Long threadUpvotes = (Long) threadEntity.getProperty("upvotes");
    ArrayList<String> threadReplyKeys = (ArrayList<String>) threadEntity.getProperty("replyKeys");
    long threadReplyCount = (long) threadEntity.getProperty("replyCount");
    long threadTimeSubmitted = (long) threadEntity.getProperty("timeSubmitted");
    String threadAccountEmail = (String) threadEntity.getProperty("accountEmail");
    String threadKey = KeyFactory.keyToString(threadEntity.getKey());
    ArrayList<Comment> threadReplyComments = null;
    try{
        threadReplyComments = convertReplyKeysToComments(threadReplyKeys, datastore);
    } catch(Exception e){
        e.printStackTrace();
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
    }

    ForumThread thread = new ForumThread(threadTitle,threadBody,threadAccountEmail,threadUpvotes,threadTimeSubmitted,threadReplyComments,threadReplyCount,threadKey,"");

    String json = convertToJson(thread);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private static String convertToJson(ForumThread lst){
    Gson gson = new Gson();
    String json = gson.toJson(lst);
    return json;  
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

  private ArrayList<Comment> convertReplyKeysToComments(ArrayList<String> keys, DatastoreService datastore) throws EntityNotFoundException{
      ArrayList<Comment> commentReplies = new ArrayList<Comment>();
      if (keys != null){

        for (String keyIdString : keys) {
                Key keyId= KeyFactory.stringToKey(keyIdString);
                Entity replyEntity = datastore.get(keyId);
                String replyComment = (String) replyEntity.getProperty("comment");
                String replyAccountEmail = (String) replyEntity.getProperty("accountEmail");
                long replyUpvotes = (long) replyEntity.getProperty("upvotes");
                ArrayList<String> replyKeys = (ArrayList<String>) replyEntity.getProperty("replyKeys");
                long replyTimeSubmitted = (long) replyEntity.getProperty("timeSubmitted");
                long replyRepliesCount = (long) replyEntity.getProperty("replyCount");
                String replyKey = KeyFactory.keyToString(replyEntity.getKey());
                String replyTimeAgoFormatted = formattedTimeAgo(replyTimeSubmitted);
                ArrayList<Comment> replyCommentReplies = convertReplyKeysToComments(replyKeys, datastore); 

                Comment comment = new Comment(replyComment, replyAccountEmail, replyTimeSubmitted, replyUpvotes, replyCommentReplies, replyRepliesCount, replyKey, replyKey, replyTimeAgoFormatted);
                commentReplies.add(comment);
            }
      }
      return commentReplies;

  }

  private String formattedTimeAgo(long timeSubmitted){
      PrettyTime pTime = new PrettyTime(new Date());
      return pTime.format(new Date(timeSubmitted));
  }


}
