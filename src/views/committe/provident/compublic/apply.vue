<template>
  <div class="apply">
    <el-dialog title="资金申请" :visible.sync="dialogVisible" width="40%">
      <div>
        <div style="margin-bottom:15px;font-size:16px">
          <span>当前资金池可用金额:</span>
          <span style="font-weight:bold">{{ curMoney }}元</span>
        </div>
        <el-form
          ref="applyForm"
          :rules="rules"
          :model="applyData"
          label-width="130px"
        >
          <!-- <el-form-item label="当前业务资金池额度">
            <el-input v-model="applyData.name" disabled></el-input>
          </el-form-item>-->
          <el-form-item label="金额(元)：" prop="sqje">
            <el-input v-model="applyData.sqje" placeholder="请输入">
              <!-- <template slot="append">元</template> -->
              <i
slot="suffix"
style="font-style:normal;margin-right: 10px;"
>元</i>
            </el-input>
          </el-form-item>
          <el-form-item label="申请理由：" prop="sqly">
            <el-input v-model="applyData.sqly" placeholder="请输入"></el-input>
            <!-- <el-select
              v-model="applyData.sqly"
              placeholder="请选择"
              prop="sqly"
              style="width:100%"
            >
              <el-option
                v-for="dict in reasonOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>-->
          </el-form-item>
          <el-form-item label="资金变动类型：" prop="zjbdlx">
            <!-- <el-input v-model="applyData.sqly"></el-input> -->
            <el-select
              v-model="applyData.zjbdlx"
              placeholder="请选择"
              prop="zjbdlx"
              style="width:100%"
            >
              <el-option
                v-for="dict in reasonOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="bz">
            <el-input
              v-model="applyData.bz"
              type="textarea"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="btnLoad"
          @click="submitForm('applyForm')"
          >发起流程</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { useCapital, begainProcess } from '@/api/committe/apply';
import { recordList } from '@/api/committe/record';
export default {
  name: 'Apply',
  data() {
    return {
      dialogVisible: true,
      applyData: {},
      curMoney: '',
      rules: {
        sqje: [{ required: true, message: '请输入', trigger: 'blur' }],
        sqly: [{ required: true, message: '请输入', trigger: 'blur' }],
        bz: [{ required: true, message: '请输入', trigger: 'blur' }],
        zjbdlx: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      reasonOptions: [],
      btnLoad: false,
      zjFirstApply: false,
      zjFirstApplyData: []
    };
  },
  mounted() {
    this.getUseCapital();
    // 申请理由
    this.$getDicts('apply_reason').then(res => {
      this.reasonOptions = res.data;
    });
  },
  methods: {
    getUseCapital() {
      useCapital(4).then(res => {
        this.curMoney = res.data.quota;
      });
    },
    submitForm(formName) {
      recordList().then(res => {
        const result = res.rows;
        this.zjFirstApplyData = res.rows;
        for (let i = 0; i < result; i++) {
          if (result[i].operateType == '1') {
            this.zjFirstApply = true;
          }
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.applyData.zjbdlx == '3') {
            if (this.applyData.zjbdlx != '1') {
              this.zjFirstApply = false;
            }
            // if(this.zjFirstApply || this.applyData.zjbdlx!='1'){
            if (this.applyData.sqje > this.curMoney) {
              this.$message.warning('输入金额大于可用金额,不允许发起!');
            } else {
              this.btnLoad = true;
              begainProcess(this.applyData).then(res => {
                if (res.code == 200 && res.data == '1') {
                  this.$message.success('启动成功!');
                  this.btnLoad = false;
                  this.dialogVisible = false;
                }
                if (res.data == '-1') {
                  this.$message.warning('已首次申请，不能再次进行首次申请!');
                  this.btnLoad = false;
                }
              });
            }
            // }else{
            //       this.$message.warning('已首次申请，不能再次进行首次申请!');
            //       this.btnLoad = false;

            // }
          } else {
            this.btnLoad = true;
            if (this.applyData.zjbdlx != '1') {
              this.zjFirstApply = false;
            }
            // if(this.zjFirstApply || this.applyData.zjbdlx!='1'){

            begainProcess(this.applyData).then(res => {
              if (res.code == 200 && res.data == '1') {
                this.$message.success('启动成功!');
                this.btnLoad = false;
                this.dialogVisible = false;
              }
              if (res.data == '-1') {
                this.$message.warning('已首次申请，不能再次进行首次申请!');
                this.btnLoad = false;
              }
            });
            // }
            // else{
            //       console.log('this.applyData',this.applyData)
            //     this.$message.warning('已首次申请，不能再次进行首次申请!');
            //       this.btnLoad = false;

            // }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.applyForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
