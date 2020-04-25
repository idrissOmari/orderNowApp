package fr.omatech.ordernow.repository;

import fr.omatech.ordernow.domain.RestaurantTable;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RestaurantTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
}
