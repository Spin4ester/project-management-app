import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import { useForm } from 'react-hook-form';
import { IErrorResponse, INewUser, IUser, IUserUpdate } from 'common/types';
import {
  updateUserOnServer,
  userSigninFetch,
  updateUserInfo,
  deleteUserFromServer,
  signOutUser,
} from 'redux/UserSlice';
import { removeUserFromLocalStorage } from 'components/Header/Header';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { closeDeleteProfileModal, openDeleteProfileModal } from 'redux/ModalSlice';

export function Profile() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setError,
    reset,
  } = useForm({ defaultValues: { name: '', login: '', password: '', confirmPassword: '' } });
  const { userId, userName, userLogin } = useSelector((state: RootState) => state.user);

  const modalOpen = useSelector((state: RootState) => state.modal.user.deleteProfileModal);
  const dispatch = useDispatch<AppDispatch>();

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  async function updateUser(newUserInfo: INewUser) {
    if (newUserInfo.name || newUserInfo.login || newUserInfo.password) {
      const updatedUser: IUserUpdate = {
        name: newUserInfo.name || userName,
        login: newUserInfo.login || userLogin,
        password: newUserInfo.password || newUserInfo.confirmPassword!,
      };
      const newUserData = await (await dispatch(updateUserOnServer([userId, updatedUser]))).payload;
      if ((newUserData as IErrorResponse).statusCode) {
        const loginError = (newUserData as IErrorResponse).statusCode === 409;
        setError(
          'login',
          {
            type: 'custom',
            message: loginError ? `${t('LoginTaken')}` : (newUserData as IErrorResponse).message,
          },
          { shouldFocus: true }
        );
      } else {
        dispatch(updateUserInfo(newUserData as IUser));
        reset();
      }
    }
  }

  async function deleteUser(toBeDeleted: boolean) {
    if (toBeDeleted) {
      try {
        await dispatch(deleteUserFromServer(userId));
        removeUserFromLocalStorage();
        dispatch(signOutUser());
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    deleteUser(deleteConfirmed);
    // eslint-disable-next-line
  }, [deleteConfirmed]);

  return (
    <div className={styles.container}>
      {modalOpen && (
        <DeleteModal
          onDeleteClick={async () => {
            setDeleteConfirmed(true);
            dispatch(closeDeleteProfileModal());
          }}
          onCancelClick={() => {
            dispatch(closeDeleteProfileModal());
            setDeleteConfirmed(false);
          }}
        />
      )}
      <h5>
        {t('Hello')}, {userName}!
      </h5>

      <div className={styles.profile_content}>
        <div>
          <img
            className={styles.profileImg}
            src={require('../../assets/images/profile-photo.png')}
            alt="Profile pic"
          />
          {/* <button className={styles.button}>{t('UpdateImage')}</button> */}
        </div>

        <form
          className={styles.profile_edit}
          onSubmit={handleSubmit(async (data) => {
            const auth = await dispatch(
              userSigninFetch({ login: userLogin, password: data.confirmPassword })
            );
            if ((auth.payload as IErrorResponse).statusCode === 401) {
              setError(
                'confirmPassword',
                { type: 'custom', message: `${t('WrongPassword')}` },
                { shouldFocus: true }
              );
            } else {
              updateUser(data as INewUser);
            }
          })}
        >
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder={(t('EditName') as string) + `: ${userName}`}
              type="text"
              autoComplete="off"
              {...register('name', {
                maxLength: { value: 30, message: `${t('MaxNameLength')}` },
              })}
            ></input>
            <p className={styles.authError} id="userNameError">
              {errors.name?.message?.toString()}
            </p>
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder={(t('EditLogin') as string) + `: ${userLogin}`}
              type="text"
              autoComplete="off"
              {...register('login', {
                maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                validate: (value) => value === '' || value.length >= 2 || `${t('AtLeast2symbols')}`,
              })}
            ></input>
            <p className={styles.authError} id="userLoginError">
              {errors.login?.message?.toString()}
            </p>
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder={t('EditPassword') as string}
              type="password"
              autoComplete="off"
              {...register('password', {
                validate: (value) => value === '' || value.length >= 8 || `${t('AtLeast8symbols')}`,
              })}
            ></input>
            <p className={styles.authError} id="passwordError">
              {errors.password?.message?.toString()}
            </p>
          </div>

          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder={t('ConfirmWithPassword') as string}
              type="password"
              autoComplete="off"
              {...register('confirmPassword', {
                required: { value: true, message: `${t('ThisFieldIsRequired')}` },
              })}
            ></input>
            <p className={styles.authError} id="comfirmPasswordError">
              {errors.confirmPassword?.message?.toString()}
            </p>
          </div>

          <button
            className={styles.buttonUpdate}
            disabled={
              !isDirty || (dirtyFields.confirmPassword && Object.keys(dirtyFields).length === 1)
            }
          >
            {t('UpdateProfile')}
          </button>
        </form>
        <button className={styles.buttonDelete} onClick={() => dispatch(openDeleteProfileModal())}>
          {t('DeleteProfile')}
        </button>
      </div>
    </div>
  );
}
