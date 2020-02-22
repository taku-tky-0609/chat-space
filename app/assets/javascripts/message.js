$(function(){
  function buildMessage(message){
    if (message.image) {
      var html = 
      `<div class="chat-post">
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
          <img class="lower-message__image" src=${message.image}>
        </div>
      </div>`
      return html;
    } else {
      var html =
      `<div class="chat-post">
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
        </div>
      </div>`
      return html;
    };
  }



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
      var html = buildMessage(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })
});
