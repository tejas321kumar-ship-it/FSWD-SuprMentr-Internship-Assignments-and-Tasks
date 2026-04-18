function roleGuard(allowedRoles) {
  return function (req, res, next) {
    if (!req.user || !req.user.role) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    let isAllowed = false;

    for (let i = 0; i < allowedRoles.length; i = i + 1) {
      if (allowedRoles[i] === req.user.role) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      res.status(403).json({ message: 'You do not have permission for this route' });
      return;
    }

    next();
  };
}

module.exports = roleGuard;
