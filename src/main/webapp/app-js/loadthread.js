var count = 0;

$(document).ready(function(){
    $(".specificVotingButton").on('click', function(event){
        console.log("something happened here.")
    //event.stopPropagation();
    //event.stopImmediatePropagation();
    //(... rest of your JS code)
    });
});




function fixReplyFormCounter(countAtReply,reply){
    var elementToAttachTo = "repliesToReplyDiv"+countAtReply;
    return function(){  createReplyFormElements(reply,elementToAttachTo,false) }
}

function threadReplyElements(reply,appendId){
    count++;
    const replyOuterDiv = $('<div/>',{
        class: "commentContainer",
        style: "margin-left: 0px",
        id: 'replyOuterDiv'+count,
    }); 

    const replyUpvoteDiv = $('<div/>',{
        class: "upVoteCommentContainer",
        id: 'replyUpvoteDiv'+count,
    });

    const replyDivForm = $('<form/>',{
        class:"replycommentButton",
        "data-upvote": reply.postKey,
        id: 'replyDivForm'+count,
    }); 

    const replyCommentButtonElement = $('<button/>',{
        class:"specificVotingButton",
        type:"submit",
        id: "replyCommentButtonEl"+count
    }); 

    const specificButtonIconElement = $('<div/>',{
        class:"uvcIcon",
        id:"specificButtonIconElement"+count
    }); 

    const upvoteIconElement = $('<i/>',{
        class:"fa fa-arrow-up"
    });


    const upvoteCommentValElement = $('<div/>',{
        class:"upVoteCommentValue",
        text: reply.upvotes
    }); 

    const specificCommentDiv = $('<div/>',{
        class:"specificComment",
        text: reply.post
    }); 


//----------

    const footerMainCommentElement = $('<div/>',{
        class: "scFooter",
        id: "footerMainCommentElement"+count
    });


    const footerCommetImageElement = $('<img/>',{
        class: "iAuthorImg",
        src:"https://avatars.io/twitter/Jamesbrge",
        alt:"Author",
        id: "footerCommentImageElement"+count
    });

    const authorCommentFooterElement = $('<div/>',{
        class: "iAuthorSI",
        text: reply.accountUsername,
        id: "authorCommentFooterElement"+count
    });

    const dotCommentFooterFirstElement = $('<div/>',{
        class: "iDot",
        id: "footerCommentDotFirst"+count
    });

    const footerCircleDotElement = $('<i/>',{
        class:"fa fa-circle",
        style:"font-size: 4px;"
    });

   
    const timeAgoCommentFooterElement = $('<div/>',{
        class: "iTimeAgo",
        text: reply.formattedTimeAgo
    });

    const dotSecondCommentFooterFirstElement = $('<div/>',{
        class: "iDot",
        id: "footerCommentDotSecond"+count
    });

    const footerSecCircleDotElement = $('<i/>',{
        class:"fa fa-circle",
        style:"font-size: 4px;"
    });

    const replyButtonElement = $('<div/>',{
        class: "iReply",
        text: "Reply"
    });


    const repliesToReplyDiv = $('<div/>',{
        class: "replies",
        id: "repliesToReplyDiv"+count
    });

    //

  

    replyOuterDiv.appendTo("#"+appendId);
    replyUpvoteDiv.appendTo('#replyOuterDiv'+count);
    replyDivForm.appendTo('#replyUpvoteDiv'+count);
    replyCommentButtonElement.appendTo('#replyDivForm'+count);
    specificButtonIconElement.appendTo("#replyCommentButtonEl"+count);
    upvoteIconElement.appendTo("#specificButtonIconElement"+count);
    upvoteCommentValElement.appendTo('#replyUpvoteDiv'+count);
    specificCommentDiv.appendTo('#replyOuterDiv'+count);

    footerMainCommentElement.appendTo('#replyOuterDiv'+count);
    footerCommetImageElement.appendTo("#footerMainCommentElement"+count);
    authorCommentFooterElement.appendTo("#footerMainCommentElement"+count);

    footerCircleDotElement.appendTo("footerCommentDotFirst"+count);

    dotCommentFooterFirstElement.appendTo("#footerMainCommentElement"+count);
    timeAgoCommentFooterElement.appendTo("#footerMainCommentElement"+count);
    dotSecondCommentFooterFirstElement.appendTo("#footerMainCommentElement"+count);
    footerSecCircleDotElement.appendTo("footerCommentDotSecond"+count);
    replyButtonElement.appendTo("#footerMainCommentElement"+count);
    repliesToReplyDiv.appendTo('#replyOuterDiv'+count);
    replyButtonElement.on("click", fixReplyFormCounter(count,reply));

  
    var currentReplyCount = count;
    if (reply.keyReplies.length >= 1){
        reply.keyReplies.forEach(replyObj => {
            threadReplyElements(replyObj,"repliesToReplyDiv"+currentReplyCount);
        });
    }




    


}

function createReplyFormElements(thread,appendToElement,isThread){
    count++;
    const outerFormElement = $('<form/>',{
        action: "POST",
        action:"/post-comment/"+thread.postKey,
        id: 'replyForm'+count,
    }); 

    const outerFormDiv = $('<div/>',{
        class: "container",
        style: "margin-left: 0px",
        id: 'outerFormDiv'+count,
    }); 

    const outerFormRowDiv = $('<div/>',{
        class: "row",
        id: 'outerRowDiv'+count,
    }); 

    const firstFormColDiv = $('<div/>',{
        class: "col-9",
        id: 'firstFormColDiv'+count,
    }); 

    const firstFormColInput= $('<textarea/>',{
        class:"form-control",
        name:"comment",
        placeholder:"reply",
        id: 'firstFormColInput'+count,
    }); 

    const secondFormColDiv = $('<div/>',{
        class: "col-3",
        id: 'secondFormColDiv'+count,
    }); 

    const secondFormSubmitButton = $('<button/>',{
        type:"submit",
        class:"btn btn-primary",
        text: "Reply",
        id: 'secondFormSubmitButton'+count,
    }); 

    const formDividerUpper = $('<hr/>',{
    });

    const formDividerLower = $('<hr/>',{     
    });

    if (isThread){
        formDividerUpper.appendTo('#'+appendToElement);
        outerFormElement.appendTo('#'+appendToElement);
        formDividerLower.appendTo('#'+appendToElement);
    } else {
        formDividerUpper.insertBefore('#'+appendToElement);
        outerFormElement.insertBefore('#'+appendToElement);
        formDividerLower.insertBefore('#'+appendToElement);
    }
    outerFormDiv.appendTo('#replyForm'+count);
    outerFormRowDiv.appendTo("#outerFormDiv"+count);
    firstFormColDiv.appendTo("#outerRowDiv"+count);
    firstFormColInput.appendTo("#firstFormColDiv"+count);
    secondFormColDiv.appendTo("#outerRowDiv"+count);
    secondFormSubmitButton.appendTo("#secondFormColDiv"+count);

}

function createThreadElements(thread){
    const outerMostParentElement = $('<div/>',{
        class: 'ideaList__inner cursorOverride',
        id: 'ideaListParent',
        'data-location': 'https://google.com'
    });

    const innerTopElement = $('<div/>',{
        class: 'ideaList__inner-top',
        id: 'innerTopElement'
    });

    const threadTitleElement = $('<h3/>',{
        class: 'ideaList__inner-top-title',
        text: thread.title
    })

    const votingButtonElement = $('<div/>',{
        class: 'votingButton',
        "data-upvote":"/api/ideas/5b5743c801e21300044b7289/heart",
        id: 'votingButtonElement'
    });

    const upvoteElement = $('<div/>',{
        class: 'iUpVoteIcon',
        id: 'upvoteElement'
    });

    const upvoteIconElement = $('<i/>',{
        class:"fa fa-arrow-up"
    });


    const upvoteScoreElement = $('<div/>',{
        class: "iUpVoteScore",
        text: thread.upvotes
    });
    const threadBodyElement = $('<div/>',{
        class: "iDesc",
        text: thread.post,
        id: "threadBodyElement"
    });

    const footerMainElement = $('<div/>',{
        class: "iFooter",
        id: "footerMainElement"
    });

    const subFooterElement = $('<div/>',{
        class: "iFooterA",
        id: "subFooterElement"
    });

    const footerImageElement = $('<img/>',{
        class: "iAuthorImg",
        src:"https://avatars.io/twitter/Jamesbrge",
        alt:"Author",
        id: "footerImageElement"
    });

    const authorFooterElement = $('<div/>',{
        class: "iAuthor",
        text: thread.accountUsername,
        id: "authorFooterElement"
    });
//-----------------------------------------------------------
  
    
    outerMostParentElement.appendTo('#ideaList');
    innerTopElement.appendTo('#ideaListParent');
    threadTitleElement.appendTo('#innerTopElement');
    votingButtonElement.appendTo('#innerTopElement');
    upvoteElement.appendTo('#votingButtonElement');
    upvoteIconElement.appendTo('#upvoteElement');
    upvoteScoreElement.appendTo('#innerTopElement');
    threadBodyElement.appendTo("#ideaListParent");

    footerMainElement.appendTo("#ideaListParent");
    subFooterElement.appendTo('#footerMainElement');
    footerImageElement.appendTo("#subFooterElement");
    authorFooterElement.appendTo("#subFooterElement");

    //----------
    createReplyFormElements(thread,"ideaListParent",true);
    const replyListElement = $('<ul/>',{
        id: 'replyListElement',
    }); 

    replyListElement.appendTo("#ideaListParent");

    if (thread.keyReplies.length >= 1){
        thread.keyReplies.forEach(replyObj => {
            threadReplyElements(replyObj,"replyListElement")
        });
    }


}



function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

async function getRequest(){

  requestKey = getParameterByName("t");
  
  const response = await fetch(`/view-thread/${requestKey}`);
  if(response.status != 200){
    window.location.replace("/request-not-found");
    return;
  }
  const threadRequestJson = await response.json();
  createThreadElements(threadRequestJson);

}