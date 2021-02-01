<template>
  <div class="about">
    <h1>This is an about {{msg}}</h1>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center" type="index" :index="indexMethod"></el-table-column>
      <el-table-column 
        v-for="(item, idx) of cols" 
        :key="idx" 
        :prop="item.prop" 
        :label="item.label" 
        :width="item.width" 
        align="center"
      >
        </el-table-column>
      <!-- <el-table-column prop="mt_name" label="物料名称"  width="180" align="center"></el-table-column> -->
      <!-- <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "About",
  data() {
    return {
      msg: '乐言',
      tableData:[],
      cols: [
        {
          prop:'mt_code',
          label: '物料编码',
          width: '120'
        },
        {
          prop:'mt_name',
          label: '物料名称',
          width: '180'
        },
        {
          prop:'phnum',
          label: '采购数量',
          width: '120'
        },
        {
          prop:'totalnum',
          label: '已入库数量',
          width: '120'
        },
        {
          prop:'sale_order_code',
          label: '销售订单',
          width: '150'
        },
        {
          prop:'saleorder_phnum',
          label: '订单采购数量',
          width: '100'
        },
        {
          prop:'saleorder_inputnum',
          label: '实际入库数量',
          width: '100'
        },
        {
          prop:'position',
          label: '入库仓位',
          width: '160'
        },
        {
          prop:'num',
          label: '入库数量',
          width: '160'
        },
        {
          prop:'planTime',
          label: '计划到料时间',
          width: '180'
        }
      ]
    }
  },
  methods: {
    indexMethod(index){
      return index+1
    }
  },
  mounted() {
    axios
      .post(
        "http://192.168.16.168:8090/lyRawMaterial/lyRawMaterial/publicQuery.ua",
        {
          accesstoken: "e7d5fbb61894cf6fbc64bf3f7721a5b8",
          data: {
            result: {
              mastertable: {
                table: "wh_sup_orderpurchasedemand_input",
                condition: [
                  {
                    phcode: "CDD-202101-0045",
                    querytype: "eq",
                  },
                ],
                orderby: {
                  planTime: "asc",
                },
                page: {
                  page: 1,
                  item: 99999,
                },
              },
              reltable: [
                {
                  updatetype: "addnewcol",
                  table: "wh_sup_orderpurchasedemand_input_info",
                  condition: [
                    {
                      phcode: "phcode",
                      querytype: "eq",
                    },
                    {
                      mt_code: "mt_code",
                      querytype: "eq",
                    },
                  ],
                  addfield:
                    "sale_order_code,planTime,saleorder_phnum,saleorder_inputnum",
                },
              ],
            },
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.tableData = res.data.data
      });
  },
};
</script>
