import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FirstPage = () => {
 const { t } = useTranslation()
    return (
        <div>
            <Link to="/signin">{t('Signin')}</Link>
            <Link to="/signup">{t('Signup')}</Link>
        </div>
    )
}

export default FirstPage