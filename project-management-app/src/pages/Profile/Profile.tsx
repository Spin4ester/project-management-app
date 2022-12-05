import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'redux/Store';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import { useForm } from 'react-hook-form';
import { IErrorResponse, INewUser, IUserUpdate } from 'common/types';
import { updateUserOnServer, userSigninFetch, deleteUserFromServer } from 'redux/UserSlice';
import { removeUserFromLocalStorage } from 'common/utils';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { closeDeleteProfileModal, openDeleteProfileModal } from 'redux/ModalSlice';
import Login from '../../assets/icons/enter.png';
import Password from '../../assets/icons/padlock.png';
import User from '../../assets/icons/account.png';
import ConfirmPassword from '../../assets/icons/padlock_confirm.png';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

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

  const error = useSelector((state: RootState) => state.user.serverError);
  const modalOpen = useSelector((state: RootState) => state.modal.user.deleteProfileModal);
  const dispatch = useDispatch<AppDispatch>();

  async function updateUser(newUserInfo: INewUser) {
    if (newUserInfo.name || newUserInfo.login || newUserInfo.password) {
      const updatedUser: IUserUpdate = {
        name: newUserInfo.name || userName,
        login: newUserInfo.login || userLogin,
        password: newUserInfo.password || newUserInfo.confirmPassword!,
      };
      const updateResult = await (
        await dispatch(updateUserOnServer([userId, updatedUser]))
      ).payload;
      if (!(updateResult as IErrorResponse).statusCode) {
        reset();
      }
    }
  }

  async function deleteUser(toBeDeleted: boolean) {
    if (toBeDeleted) {
      const deleteRes = await (await dispatch(deleteUserFromServer(userId))).payload;
      if (!(deleteRes as IErrorResponse).statusCode) {
        removeUserFromLocalStorage();
      }
    }
  }

  async function onSubmit(data: INewUser) {
    const auth = await (
      await dispatch(userSigninFetch({ login: userLogin, password: data.confirmPassword! }))
    ).payload;
    if (!(auth as IErrorResponse).statusCode) {
      updateUser(data as INewUser);
    }
  }

  useEffect(() => {
    if (error.statusCode === 401) {
      setError(
        'confirmPassword',
        { type: 'custom', message: `${t('WrongPassword')}` },
        { shouldFocus: true }
      );
    }
    if (error.statusCode === 409) {
      setError('login', { type: 'custom', message: `${t('LoginTaken')}` }, { shouldFocus: true });
    }
    // eslint-disable-next-line
  }, [error.statusCode]);

  return (
    <div className={styles.container}>
      {!!error.statusCode && ![401, 409].includes(error.statusCode) && (
        <ErrorMessage error={error} />
      )}
      {modalOpen && (
        <DeleteModal
          onDeleteClick={async () => {
            dispatch(closeDeleteProfileModal());
            deleteUser(true);
          }}
          onCancelClick={() => {
            dispatch(closeDeleteProfileModal());
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
        </div>
        <div>
          <form
            className={styles.profile_edit}
            onSubmit={handleSubmit((data) => onSubmit(data as INewUser))}
          >
            <div className={styles.inputContainer}>
              <div className={styles.input_description}>
                <img src={User}></img>
                <input
                  className={styles.input}
                  placeholder={(t('EditName') as string) + `: ${userName}`}
                  type="text"
                  autoComplete="off"
                  {...register('name', {
                    maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                  })}
                ></input>
              </div>

              <p className={styles.authError} id="userNameError">
                {errors.name?.message?.toString()}
              </p>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.input_description}>
                <img src={Login}></img>
                <input
                  className={styles.input}
                  placeholder={(t('EditLogin') as string) + `: ${userLogin}`}
                  type="text"
                  autoComplete="off"
                  {...register('login', {
                    maxLength: { value: 30, message: `${t('MaxNameLength')}` },
                    validate: (value) =>
                      value === '' || value.length >= 2 || `${t('AtLeast2symbols')}`,
                  })}
                ></input>
              </div>
              <p className={styles.authError} id="userLoginError">
                {errors.login?.message?.toString()}
              </p>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.input_description}>
                <img src={Password}></img>
                <input
                  className={styles.input}
                  placeholder={t('EditPassword') as string}
                  type="password"
                  autoComplete="off"
                  {...register('password', {
                    validate: (value) =>
                      value === '' || value.length >= 8 || `${t('AtLeast8symbols')}`,
                  })}
                ></input>
              </div>
              <p className={styles.authError} id="passwordError">
                {errors.password?.message?.toString()}
              </p>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.input_description}>
                <img src={ConfirmPassword}></img>
                <input
                  className={styles.input}
                  placeholder={t('ConfirmWithPassword') as string}
                  type="password"
                  autoComplete="off"
                  {...register('confirmPassword', {
                    required: { value: true, message: `${t('ThisFieldIsRequired')}` },
                  })}
                ></input>
              </div>
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
          <button
            className={styles.buttonDelete}
            onClick={() => dispatch(openDeleteProfileModal())}
          >
            {t('DeleteProfile')}
          </button>
        </div>
      </div>
    </div>
  );
}
