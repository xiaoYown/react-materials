import React, { useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import styles from './index.module.scss';

const { Row, Col } = Grid;
export default function UserForm() {
  const formRef = useRef(null);
  const [value, setValue] = useState({
    username: '',
    displayName: '',
    email: '',
    userGroup: null,
    userState: null,
    passwd: '',
    rePasswd: '',
  });

  const checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  const checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  const formChange = value => {
    setValue(value);
  };

  const validateAllFormField = () => {
    formRef.current.validateAll((errors, values) => {
      console.log('values', values);
    });
  };

  return (
    <div className="user-form">
      <IceContainer>
        <IceFormBinderWrapper value={value} onChange={formChange} ref={formRef}>
          <div className={styles.formContent}>
            <h2 className={styles.formTitle}>添加用户</h2>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                用户名：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="username" required message="必填">
                  <Input size="large" placeholder="请输入用户名" className={styles.userName} />
                </IceFormBinder>
                <IceFormError name="username" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                昵称：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="displayName">
                  <Input size="large" placeholder="请输入昵称" className={styles.nickName} />
                </IceFormBinder>
                <IceFormError name="displayName" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                邮箱：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder type="email" name="email" required message="请输入正确的邮箱">
                  <Input
                    className={styles.emailAdd}
                    size="large"
                    placeholder="ice-admin@alibaba-inc.com"
                  />
                </IceFormBinder>
                <IceFormError name="email" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                用户组：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="userGroup">
                  <Select
                    className={styles.chooseMan}
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '管理员', value: 'administrator' },
                      { label: '投稿者', value: 'contributor' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                状态：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="userState">
                  <Select
                    className={styles.stateMan}
                    size="large"
                    placeholder="请选择..."
                    dataSource={[
                      { label: '有效', value: 'valid' },
                      { label: '禁用', value: 'disabled' },
                      { label: '过期', value: 'invalid' },
                    ]}
                  />
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                新密码：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder name="passwd" required validator={checkPasswd}>
                  <Input
                    className={styles.anotherNum}
                    htmlType="password"
                    size="large"
                    placeholder="请重新输入新密码"
                  />
                </IceFormBinder>
                <IceFormError name="passwd" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col xxs="6" s="3" l="3" className={styles.formLabel}>
                确认密码：
              </Col>
              <Col s="12" l="10">
                <IceFormBinder
                  name="rePasswd"
                  required
                  validator={(rule, values, callback) =>
                    checkPasswd2(rule, values, callback, value)
                  }
                >
                  <Input
                    className={styles.sameNum}
                    htmlType="password"
                    size="large"
                    placeholder="两次输入密码保持一致"
                  />
                </IceFormBinder>
                <IceFormError name="rePasswd" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>

        <Row>
          <Col offset="3">
            <Button size="large" type="primary" onClick={validateAllFormField}>
              提 交
            </Button>
          </Col>
        </Row>
      </IceContainer>
    </div>
  );
}
