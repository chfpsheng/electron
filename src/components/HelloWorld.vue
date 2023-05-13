<template>
  <el-button type="primary" @click="getData"> 刷新</el-button>
  <span>{{ msg }}</span>
  <el-table :data="tableData" style="width: 100%">
    <!-- <el-table-column prop="date" label="Date" width="180" /> -->
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="id" label="id" />
  </el-table>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    console.log("我是𝒆𝒅2221223323.");
    let tableData = ref([]);
    let msg = ref("");
    let ws = reactive({});

    const getData = () => {
      // axios({
      //   method: "get", //请求方式，默认是get请求
      //   url: "http://localhost:30000/users/", //地址
      // }).then((res) => {
      //   tableData.value = res.data;
      //   console.log(3333, tableData);
      // });
      msg.value = "通过websocket发送refresh消息给服务器端";
      ws.send("refresh");
    };

    onMounted(() => {
      ws = new WebSocket("ws://127.0.0.1:30002");

      //开启连接open后客户端处理方法
      ws.onopen = function () {
        // Web Socket 已连接上，在页面中显示消息
        msg.value = "当前客户端已经连接到websocket服务器";
      };
      // 点击按钮时给websocket服务器端发送消息
      // $("#btn").click(function () {
      //   var value = $("#demo").val();
      //   ws.send(value);
      // });
      // 接收消息后客户端处理方法
      ws.onmessage = function () {
        msg.value = "收到服务器更新数据消息，重新请求数据";
        axios({
          method: "get", //请求方式，默认是get请求
          url: "http://localhost:30000/users/", //地址
        }).then((res) => {
          tableData.value = res.data;
          console.log(3333, tableData);
        });
      };

      // 关闭websocket
      ws.onclose = function () {
        // 关闭 websocket
        alert("连接已关闭...");
      };

      axios({
        method: "get", //请求方式，默认是get请求
        url: "http://localhost:30000/users/", //地址
      }).then((res) => {
        tableData.value = res.data;
        console.log(3333, tableData);
      });
    });

    return {
      msg,
      tableData,
      getData,
    };
  },
};
</script>