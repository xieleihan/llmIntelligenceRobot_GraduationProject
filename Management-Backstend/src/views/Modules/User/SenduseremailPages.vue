<template>
    <div class="sendUseremailPages">
        <el-row>
            <el-col style="text-align: center;font-weight: bold;margin-bottom: .1rem;" :span="24">
                SouthAki通知程式
            </el-col>
        </el-row>
        <el-row>
            <el-col class="item" :span="24">
                <label class="label" for="">收件人:</label>
                <input class="input" type="text" placeholder="请输入收件人邮箱" />
            </el-col>
            <el-col class="item" :span="24">
                <label class="label" for="">主题:</label>
                <input class="input" type="text" placeholder="请输入邮箱主题" />
            </el-col>
            <el-col class="item" :span="24">
                <label class="label" for="">邮件内容:</label>
                <textarea class="input inputArea" name="" id="" placeholder="邮件内容"></textarea>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="item" :span="24">
                <el-button class="btn" type="primary">发送</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .sendUseremailPages {
        width: 100%;
        height: 100%;
        padding: .1rem;
        .label{
            margin-right: .1rem;
            width: .5rem;
            text-align: right;
        }
        .item{
            margin-bottom: .1rem;
            display: flex;
            justify-content: flex-end;

            .btn{
                padding: .1rem;
                font-size: .1rem;
                line-height: .1rem;
                height: .1rem;
                span{
                    font-size: .1rem;
                    line-height: .1rem;
                }
            }

            .input{
                width: calc(100% - .5rem);
                border: none;
                border-bottom: .01rem solid #ccc;
                &.inputArea{
                    height: fit-content;
                    min-height: 1rem;
                    resize: none;
                    outline: none;
                }
            }
        }
    }
</style>