package fr.omatech.ordernow.repository;

import fr.omatech.ordernow.domain.FormulaOrder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FormulaOrder entity.
 */
@Repository
public interface FormulaOrderRepository extends JpaRepository<FormulaOrder, Long> {

    @Query(value = "select distinct formulaOrder from FormulaOrder formulaOrder left join fetch formulaOrder.listProducts",
        countQuery = "select count(distinct formulaOrder) from FormulaOrder formulaOrder")
    Page<FormulaOrder> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct formulaOrder from FormulaOrder formulaOrder left join fetch formulaOrder.listProducts")
    List<FormulaOrder> findAllWithEagerRelationships();

    @Query("select formulaOrder from FormulaOrder formulaOrder left join fetch formulaOrder.listProducts where formulaOrder.id =:id")
    Optional<FormulaOrder> findOneWithEagerRelationships(@Param("id") Long id);
}
