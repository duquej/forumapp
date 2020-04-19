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
import org.ocpsoft.prettytime.*;


/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/get-threads")
public class ThreadRetrievalServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Thread").addSort("timeSubmitted", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    ArrayList<ForumThread> threads = new ArrayList<>();
    for (Entity entity : results.asIterable()){
      String title = (String) entity.getProperty("title");
      String body = (String) entity.getProperty("body");
      long upvotes = (long) entity.getProperty("upvotes");
      ArrayList<String> replyKeys = (ArrayList<String>) entity.getProperty("replyKeys");
      long replyCount = (long) entity.getProperty("replyCount");
      long timeSubmitted = (long) entity.getProperty("timeSubmitted");
      String accountEmail = (String) entity.getProperty("accountEmail");
      String postKey = KeyFactory.keyToString(entity.getKey());
      String timeAgoString = formattedTimeAgo(timeSubmitted);
      ArrayList<Comment> emptyComments = new ArrayList<Comment>();


      ForumThread thread = new ForumThread(title,body,accountEmail,upvotes,timeSubmitted,emptyComments,replyCount,postKey,timeAgoString);
      threads.add(thread);

    }
    String json = convertToJson(threads);
    response.setContentType("application/json;");
    response.getWriter().println(json);

  }

  private static String convertToJson(ArrayList<ForumThread> lst){
    Gson gson = new Gson();
    String json = gson.toJson(lst);
    return json;  
  }

  private String formattedTimeAgo(long timeSubmitted){
      PrettyTime pTime = new PrettyTime(new Date());
      return pTime.format(new Date(timeSubmitted));


  }


}
