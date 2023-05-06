<template>
  <el-table :data="tableData" style="width: 100%">
    <!-- <el-table-column prop="date" label="Date" width="180" /> -->
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="id" label="id" />
  </el-table>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    console.log("我是𝒆𝒅2221223323.");
    let tableData = ref([]);

    onMounted(() => {
      axios({
        method: "get", //请求方式，默认是get请求
        url: "http://localhost:30000/users/", //地址
      }).then((res) => {
        tableData.value = res.data;
        console.log(3333, tableData);
      });
    });

    return {
      tableData,
    };
  },
};
</script>