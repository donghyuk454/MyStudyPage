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
    function submit(){
      setTimeout(function(){
        document.getElementById('form').submit();
      }, 500);
    }
    async function change(){
      document.getElementById('desc').value = document.getElementById('desc').value.replace(/</gi, '&lt;');

      await submit();
    }
  </script>
  <input type="button" value="제출" onclick="change();"></input>
</form>
