package fr.omatech.ordernow.repository;

import fr.omatech.ordernow.domain.MenuCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MenuCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {
}
