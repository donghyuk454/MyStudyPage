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
  <textarea name="descricption" placeholder="내용을 입력하세요." style="width: 100%; height: 300px;" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea>
  <input type="submit"></input>
</form>
