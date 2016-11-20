function draw(child,Node)
{
    /*
    * 效果说明:
    * 在两个参数元素间连一条线
    */

    //获取两个节点相对于viewport的距离，其中25为节点中心补正
    var y1 = Node.getBoundingClientRect().top + 25;
    var x1 = Node.getBoundingClientRect().left + 25;
    var y2 = child.getBoundingClientRect().top + 25;
    var x2 = child.getBoundingClientRect().left + 25;

    var cvs = document.getElementById('cvs'); //画布
    var pen = cvs.getContext('2d'); // 画笔

    pen.moveTo(x1,y1);
    pen.lineTo(x2,y2);
    pen.stroke();
    pen.lineWidth = 3;
    pen.strokeStyle = 'rgba(255,255,255,1)';
}

function CreateChild(Node,Number,Width)
{
    /*
    *效果说明：
    * Node:父元素
    * Number:创建子元素数量
    * Width:子元素将分布在以父元素为中心的区域的宽度（虽然这个有点不太精确。。。）
    *
     */

    var child;
    var i;

    var top = Node.offsetTop;//获取父节点位置，该方法获取的数值
    var distance = Width / (Number - 1);//每个子节点间的距离，增加的50是单个节点宽度

    for(i = 0;i < Number;i++)
    {
        child = document.createElement('div');
        Node.appendChild(child);
        child.style.top = (top + 40) + 'px';//设置子元素相对于父元素的位置，该方法获取的是字符串
        child.style.left = (( 0 - Width / 2) + i * distance) + 'px';
        draw(child,Node);
    }
}

function init()
{
    /*
    * 效果说明：
    * 初始化创建二叉树
    */
    var node = document.getElementById('root');
    /*创建第二层*/
    CreateChild(node,2,600);
    /*创建第三层*/
    CreateChild(node.children[0],2,300);
    CreateChild(node.children[1],2,300);
    /*创建第四层*/
    CreateChild(node.children[0].children[1],2,200);

    CreateChild(node.children[1].children[1],2,200);
    CreateChild(node.children[1].children[0],2,200);
    /*创建第五层*/
    CreateChild(node.children[0].children[1].children[1],2,200);
    CreateChild(node.children[1].children[1].children[0],2,200);


}
/**********************************以下是遍历区*****************************************************************/

//计时器不能带参数
var Pre_Order_Number = 1;//这个值用于颜色变化延迟运算
var judge = 0;//这个值用于判断是否正在遍历

function ColorChange(node){
    node.style.backgroundColor = 'red';
}
//创建一个函数，用于返回一个无参数函数
function _ColorChange(node){
    return function(){
        ColorChange(node);
    }
}


function Clear()
{
    /*
     *效果说明:
     * 用一次前序遍历，将树重置
     */
    if(judge!=0)
    {
        return;
    }
    Pre_Order_Number = 0;

    //初始化
    var Node = document.getElementById('root');
    auto(Node);
    //实体部分
    function auto(node)
    {
        if(node != undefined)
        {
            node.style.backgroundColor = '#00ff00';
            auto(node.children[0]);
            auto(node.children[1]);
        }
    }
}

function Pre_Order()
{
    /*
    *效果说明:
    * 就是前序遍历
    */
    if(judge!=0)
    {
        return;
    }
    Clear();
    judge = 1;

    //初始化
    var Node = document.getElementById('root');
    auto(Node);
    //实体部分
    function auto(node)
    {
        if(node != undefined)
        {
            Pre_Order_Number += 1;
            setTimeout(_ColorChange(node),500*Pre_Order_Number);
            auto(node.children[0]);
            auto(node.children[1]);
        }
    }

    setTimeout(function() {
        judge = 0;
    },500*Pre_Order_Number);
}

function In_Order()
{
    /*
     *效果说明:
     * 就是中序遍历
     */

    //运行判断部分
    if(judge!=0)
    {
        return;
    }
    Clear();
    judge = 1;

    //初始化
    var Node = document.getElementById('root');
    auto(Node);
    //实体部分
    function auto(node)
    {
        if(node != undefined)
        {
            auto(node.children[0]);
            Pre_Order_Number += 1;
            setTimeout(_ColorChange(node),500*Pre_Order_Number);
            auto(node.children[1]);
        }
    }

    setTimeout(function() {
        judge = 0;
    },500*Pre_Order_Number);
}

function Post_Order()
{
    /*
     *效果说明:
     * 就是后序遍历
     */
    if(judge!=0)
    {
        return;
    }
    Clear();
    judge = 1;

    //初始化
    var Node = document.getElementById('root');
    auto(Node);
    //实体部分
    function auto(node)
    {
        if(node!= undefined)
        {
            auto(node.children[0]);
            auto(node.children[1]);
            Pre_Order_Number += 1;
            setTimeout(_ColorChange(node),500*Pre_Order_Number);
        }
    }

    setTimeout(function() {
        judge = 0;
    },500*Pre_Order_Number);
}

function merge(l1,l2)//不知道为何我使用concat会抽风，所以就出现了这个将两个数组合并的函数
{
    var i;
    var L = l1;
    var length = l1.length;

    for(i=0;i<l2.length;i++)
    {
        L[length + i] = l2[i];
    }

    return L;
}

function Layer()
{
    /*
     *效果说明:
     * 就是广度优先遍历
     */
    if(judge!=0)
    {
        return;
    }
    Clear();
    judge = 1;

    var list = [document.getElementById('root')];
    Pre_Order_Number += 1;
    setTimeout(_ColorChange(list[0]),500*Pre_Order_Number);

    auto(list);
    function auto(nodelist)//nodelist为所有父节点的数组
    {
        var i;
        var total = [];//total为所有子节点的数组\
        var child;

        for(i=0;i < nodelist.length;i++)
        {
            child = nodelist[i].children;
            total = merge(total,child);
        }

        for(i=0;i < total.length;i++)
        {
            Pre_Order_Number += 1;
            setTimeout(_ColorChange(total[i]),500*Pre_Order_Number);
        }

        if(total.length > 0)
        {
            auto(total);
        }
    }

    setTimeout(function() {
        judge = 0;
    },500*Pre_Order_Number);
}