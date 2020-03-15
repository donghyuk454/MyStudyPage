<form id="form" action='../post' method='post'>
  <p>
    <strong>Subject</strong><br>
    <input type="text" name="page" id="page_" placeholder="과목을 입력하세요."style="width: 100%;"></input>
  </p>
  <p>
    <strong>Title</strong><br>
    <input type="text" name="title" placeholder="제목을 입력하세요." style="width: 100%;"></input>
  </p>
  <strong>Description</strong><br>
  <textarea name="descricption" id='desc' placeholder="내용을 입력하세요." style="width: 100%; height: 300px;" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea>
  <script>
    function CheckEmailFromCookie()
    {
      var allcookies = document.cookie;

      cookiearray  = allcookies.split(';');

      for(var i=0; i<cookiearray.length; i++){
          name = cookiearray[i].split('=')[0];
          value = cookiearray[i].split('=')[1];
          if(name === ' email' || name === 'email')
          {
            if(value === 'donghyuk454@gmail.com' || value === ' donghyuk454@gmail.com')
            {
              return true;
            }
            return false;
          }
      }
      return false;
    }
    function submit(){
      setTimeout(function(){
        document.getElementById('form').submit();
      }, 500);
    }
    async function change(){
      document.getElementById('desc').value = document.getElementById('desc').value.replace(/</gi, '&lt;');

      await submit();
    }
    function checkAuth()
    {
      if(CheckEmailFromCookie())
      {
        return true;
      }
      alert("로그인을 먼저 해주세요.");

      return false;
    }
  </script>
  <input type="button" value="제출" onclick="if(checkAuth())change();"></input>
</form>
