$(function(){
  function buildHTML(message) {
     var image = message.image? `<img src=  ${message.image}  class="lower-message__image">` : "";
       html = 
      `<div class="chat-post" data-message-id= ${message.id}> 
        <div class="chat-name">
          ${message.user_name}
          <span class="message-date">
              ${message.created_at}
          </span>
        </div>
        <div class="chat-message">
          <p class="message__content">
            ${message.content}
          </p>
          ${image}
        </div>
      </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージを入力してください");
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.chat-post:last').data("message-id");
 
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);      
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
