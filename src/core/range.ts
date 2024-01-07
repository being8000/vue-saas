/**
 * 检查Range是否在可编辑元素中
 * @param range
 * @returns
 */
export const isEditable = (range: Range) => {
  return (
    // range.commonAncestorContainer 获取Range所在的DOM树范围
    (range.commonAncestorContainer as HTMLElement).contentEditable === "true"
  );
};

/**
 * 扩展Range以包含整个行或段落
 * @param range
 */
export const expandToLine = (range: Range) => {
  let startNode = range.startContainer;
  while (
    startNode.previousSibling &&
    startNode.previousSibling.nodeName !== "BR"
  ) {
    startNode = startNode.previousSibling;
  }

  let endNode = range.endContainer;
  while (endNode.nextSibling && endNode.nextSibling.nodeName !== "BR") {
    endNode = endNode.nextSibling;
  }

  range.setStartBefore(startNode);
  range.setEndAfter(endNode);
};

/**
 * 在Range中插入HTML
 * @param range
 * @param html
 */
export const insertHtmlAtRange = (range: Range, html: string) => {
  const fragment = range.createContextualFragment(html);
  range.deleteContents();
  range.insertNode(fragment);
};

export function getSelectionRange() {
  return window.getSelection()?.getRangeAt(0);
}

export function selectText(editor: Node) {
  var range = document.createRange();
  range.selectNodeContents(editor);
  var selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function deleteText() {
  var range = getSelectionRange();
  range?.deleteContents();
}

export function insertText(newNode: Node) {
  var range = getSelectionRange();
  range?.deleteContents();
  range?.insertNode(newNode);
}
/**
 * 将选中的内容包含在指定的新元素里面
 * @param ele
 */
export function wrapSelectedText(ele: HTMLElement) {
  var range = getSelectionRange();
  range?.surroundContents(ele);
}

/**
 * 搜索节点里面的文字并设置字体高亮
 * @param node
 * @param searchTerm
 */
export function highlightText(node: Node, searchTerm: string) {
  var body = node;
  var textNodes: Node[] = [];

  function findTextNodes(node: Node) {
    if (node.nodeType === 3) {
      // 文本节点
      textNodes.push(node);
    } else {
      for (var i = 0; i < node.childNodes.length; i++) {
        findTextNodes(node.childNodes[i]);
      }
    }
  }

  findTextNodes(body);

  textNodes.forEach(function (textNode) {
    var start = textNode.nodeValue?.indexOf(searchTerm);
    if (start !== -1) {
      var range = document.createRange();
      range.setStart(textNode, start || 0);
      range.setEnd(textNode, start || 0 + searchTerm.length);
      var span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      range.surroundContents(span);
    }
  });
}
